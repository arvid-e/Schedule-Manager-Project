import { beforeEach, describe, it, expect, vi, Mock } from 'vitest';
import { Types } from 'mongoose';

// Import the service and its types/dependencies
import { IEventDataDocument, IEventDataDocumentPayload, IEventRepository, IUpdateEventData, ICreateEventData } from '../types/event.types';
import { EventService } from './event.service'; // Adjust path if necessary

// --- Mock Dependencies ---
const mockEventRepository: {
    findAllEvents: Mock;
    findById: Mock;
    createEvent: Mock;
    deleteEvent: Mock;
    updateEvent: Mock;
} = {
    findAllEvents: vi.fn(),
    findById: vi.fn(),
    createEvent: vi.fn(),
    deleteEvent: vi.fn(),
    updateEvent: vi.fn(),
};

// --- Test Subject Instance ---
let eventService: EventService;

// --- Helper function to create a mocked Mongoose Document ---
const createMockDocument = (
    data: Partial<IEventDataDocumentPayload> &
    Partial<{ _id: Types.ObjectId | string; createdAt: Date; updatedAt: Date }>
): IEventDataDocument => {
    const defaultData = {
        _id: new Types.ObjectId(), // Default to a new ObjectId
        title: 'Mock Title',
        description: 'Mock Description',
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mergedData = { ...defaultData, ...data };

    const mockDoc = {
        ...mergedData,
        toObject: vi.fn().mockImplementation(function(this: IEventDataDocument) {
            const obj = { ...this };

            // Ensure _id is handled correctly for the plain object representation
            // If the mock was created with a Types.ObjectId, convert it to string for toObject()
            if (obj._id instanceof Types.ObjectId) {
                obj._id = obj._id.toString();
            }
            // If it was already a string, it remains a string.
            // Other Document-specific properties you might want to remove for the plain object:
            // delete obj.$isNew;
            // delete obj.$locals;
            // etc. (if you were mocking them)

            return obj;
        }),
    };

    return mockDoc as unknown as IEventDataDocument;
};


describe('EventService', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        eventService = new EventService(mockEventRepository as IEventRepository);
    });

    // --- Test Suite for getAllEvents method ---
    describe('getAllEvents', () => {
        const mockEvents: IEventDataDocument[] = [
            createMockDocument({ _id: new Types.ObjectId('60d5ec49f1c7f4001c9c7c7c'), title: 'Concert', description: 'Desc1' }),
            createMockDocument({ _id: new Types.ObjectId('60d5ec49f1c7f4001c9c7c7d'), title: 'Meeting', description: 'Desc2' }),
        ];

        it('should return all events from the repository', async () => {
            mockEventRepository.findAllEvents.mockResolvedValue(mockEvents);
            const result = await eventService.getAllEvents();
            expect(mockEventRepository.findAllEvents).toHaveBeenCalledTimes(1);
            expect(result).toEqual(mockEvents);
        });

        it('should return an empty array if no events are found in the repository', async () => {
            mockEventRepository.findAllEvents.mockResolvedValue([]);
            const result = await eventService.getAllEvents();
            expect(mockEventRepository.findAllEvents).toHaveBeenCalledTimes(1);
            expect(result).toEqual([]);
        });

        it('should propagate errors from the repository', async () => {
            const repoError = new Error('Database connection failed');
            mockEventRepository.findAllEvents.mockRejectedValue(repoError);
            await expect(eventService.getAllEvents()).rejects.toThrow(repoError);
            expect(mockEventRepository.findAllEvents).toHaveBeenCalledTimes(1);
        });
    });

    // --- Test Suite for getEventById method ---
    describe('getEventById', () => {
        const mockEvent: IEventDataDocument = createMockDocument({
            _id: new Types.ObjectId('60d5ec49f1c7f4001c9c7c7e'),
            title: 'Concert',
            description: 'Desc1',
        });

        // Cast _id to Types.ObjectId for .toString() if needed, as per previous fix
        const eventId = (mockEvent._id as Types.ObjectId).toString();
        const nonExistentId = 'nonExistent';

        it('should return the event if found by ID', async () => {
            mockEventRepository.findById.mockResolvedValue(mockEvent);
            const result = await eventService.getEventById(eventId);
            expect(mockEventRepository.findById).toHaveBeenCalledTimes(1);
            expect(mockEventRepository.findById).toHaveBeenCalledWith(eventId);
            expect(result).toEqual(mockEvent);
        });

        it('should return null if event not found by ID', async () => {
            mockEventRepository.findById.mockResolvedValue(null);
            const result = await eventService.getEventById(nonExistentId);
            expect(mockEventRepository.findById).toHaveBeenCalledTimes(1);
            expect(mockEventRepository.findById).toHaveBeenCalledWith(nonExistentId);
            expect(result).toBeNull();
        });

        it('should propagate errors from the repository', async () => {
            const repoError = new Error('Network error during findById');
            mockEventRepository.findById.mockRejectedValue(repoError);
            await expect(eventService.getEventById(eventId)).rejects.toThrow(repoError);
            expect(mockEventRepository.findById).toHaveBeenCalledTimes(1);
        });
    });

    // --- Test Suite for createEvent method ---
    describe('createEvent', () => {
        const createInput: ICreateEventData = {
            title: 'New Event',
            description: 'A new event',
        };

        const mockCreatedDocument: IEventDataDocument = createMockDocument({
            _id: new Types.ObjectId('60d5ec49f1c7f4001c9c7c7f'),
            title: createInput.title,
            description: createInput.description,
        });

        it('should create an event and return the created event document', async () => {
            mockEventRepository.createEvent.mockResolvedValue(mockCreatedDocument);
            const result = await eventService.createEvent(createInput);
            expect(mockEventRepository.createEvent).toHaveBeenCalledTimes(1);
            expect(mockEventRepository.createEvent).toHaveBeenCalledWith(createInput);
            expect(result).toEqual(mockCreatedDocument);
        });

        it('should propagate errors from the repository', async () => {
            const repoError = new Error('Validation failed during create');
            mockEventRepository.createEvent.mockRejectedValue(repoError);
            await expect(eventService.createEvent(createInput)).rejects.toThrow(repoError);
            expect(mockEventRepository.createEvent).toHaveBeenCalledTimes(1);
        });
    });

    // --- Test Suite for deleteEvent method ---
    describe('deleteEvent', () => {
        const eventIdToDelete = 'e1';

        it('should return true if an event was successfully deleted', async () => {
            mockEventRepository.deleteEvent.mockResolvedValue(true);
            const result = await eventService.deleteEvent(eventIdToDelete);
            expect(result).toBe(true);
            expect(mockEventRepository.deleteEvent).toHaveBeenCalledTimes(1);
            expect(mockEventRepository.deleteEvent).toHaveBeenCalledWith(eventIdToDelete);
        });

        it('should return false if no event was deleted', async () => {
            mockEventRepository.deleteEvent.mockResolvedValue(false);
            const result = await eventService.deleteEvent('nonExistentId');
            expect(result).toBe(false);
            expect(mockEventRepository.deleteEvent).toHaveBeenCalledTimes(1);
            expect(mockEventRepository.deleteEvent).toHaveBeenCalledWith('nonExistentId');
        });

        it('should propagate errors from the repository', async () => {
            const repoError = new Error('DB error during delete');
            mockEventRepository.deleteEvent.mockRejectedValue(repoError);
            await expect(eventService.deleteEvent(eventIdToDelete)).rejects.toThrow(repoError);
            expect(mockEventRepository.deleteEvent).toHaveBeenCalledTimes(1);
        });
    });

    // --- Test Suite for updateEvent method ---
    describe('updateEvent', () => {
        const updateData: IUpdateEventData = {
            _id: 'e1',
            title: 'Updated Title',
            description: 'Updated Desc',
        };

        it('should return true if an event was successfully updated', async () => {
            mockEventRepository.updateEvent.mockResolvedValue(true);
            const result = await eventService.updateEvent(updateData);
            expect(result).toBe(true);
            expect(mockEventRepository.updateEvent).toHaveBeenCalledTimes(1);
            expect(mockEventRepository.updateEvent).toHaveBeenCalledWith(updateData);
        });

        it('should return false if no event was updated', async () => {
            const nonExistentUpdate: IUpdateEventData = {
                _id: 'nonExistentId',
                title: 'Attempt Update',
                description: 'Attempt Desc',
            };
            mockEventRepository.updateEvent.mockResolvedValue(false);
            const result = await eventService.updateEvent(nonExistentUpdate);
            expect(result).toBe(false);
            expect(mockEventRepository.updateEvent).toHaveBeenCalledTimes(1);
            expect(mockEventRepository.updateEvent).toHaveBeenCalledWith(nonExistentUpdate);
        });

        it('should propagate errors from the repository', async () => {
            const repoError = new Error('Concurrency error during update');
            mockEventRepository.updateEvent.mockRejectedValue(repoError);
            await expect(eventService.updateEvent(updateData)).rejects.toThrow(repoError);
            expect(mockEventRepository.updateEvent).toHaveBeenCalledTimes(1);
        });
    });
});