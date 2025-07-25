import { ICreateEventData, IEventDataDocument, IUpdateEventData } from '@app/types/event.types';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { EventRepository } from './event.repository';


const mockEventModel = {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    deleteOne: vi.fn(),
    updateOne: vi.fn(),
} as any;

let eventRepository: EventRepository;

describe('EventRepository', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        eventRepository = new EventRepository(mockEventModel);
    })

    describe('findAllEvents', () => {
        const mockEvents = [
        { _id: 'event1', title: 'Concert', date: '2025-07-20', toObject: () => ({ _id: 'event1', title: 'Concert', date: '2025-07-20' }) },
        { _id: 'event2', title: 'Meeting', date: '2025-07-21', toObject: () => ({ _id: 'event2', title: 'Meeting', date: '2025-07-21' }) },
      ];

      it('should return all events', async () => {
        mockEventModel.find.mockResolvedValue(mockEvents);
        const result = await eventRepository.findAllEvents();

        expect(result).toEqual(mockEvents);
        expect(mockEventModel.find).toHaveBeenCalledTimes(1);

      })
    })


    describe('findById', () => {
        const mockEvents = [
        { _id: 'event1', title: 'Concert', date: '2025-07-20', toObject: () => ({ _id: 'event1', title: 'Concert', date: '2025-07-20' }) },
        { _id: 'event2', title: 'Meeting', date: '2025-07-21', toObject: () => ({ _id: 'event2', title: 'Meeting', date: '2025-07-21' }) },
      ];
        
        const eventObject = mockEvents[1]
        const eventId = eventObject._id;

      it('should return event with specific ID', async () => {
        mockEventModel.findById.mockResolvedValue(eventObject);
        const result = await eventRepository.findById(eventId);

        expect(result).toEqual(eventObject.toObject());
        expect(mockEventModel.findById).toHaveBeenCalledTimes(1);
      })


    })

    describe('createEvent', () => {
        type MockDocumentContext = IEventDataDocument & { toObject: () => IEventDataDocument };

        const newEvent: ICreateEventData = {
            title: "New event",
            description: 'This is a description of the new event.',
        }

        const mockCreatedEventData = {
            _id: '123456789',
            title: "New event",
            description: 'This is a description of the new event.',
            createdAt: new Date('2025-07-20T10:00:00.000Z'),
            updatedAt: new Date('2025-07-20T10:11:00.000Z'),
            toObject: vi.fn().mockImplementation(function(this: MockDocumentContext) {

            const { toObject, ...rest } = this;
            return rest as IEventDataDocument; 

        })
        } as unknown as IEventDataDocument & { toObject: () => IEventDataDocument};

      it('should return event data ', async () => {
        mockEventModel.create.mockResolvedValue(mockCreatedEventData);
        const result = await eventRepository.createEvent(newEvent);

        expect(result).toEqual(mockCreatedEventData.toObject());
        expect(mockEventModel.create).toHaveBeenCalledTimes(1);
        expect(mockEventModel.create).toHaveBeenCalledWith(newEvent);
      })
    })

    describe('deleteEvent', () => {
        const existingEventId = '123456789';    
        const nonExistingEventId = '987654321'
    
      it('should return true if event deleted', async () => {
        mockEventModel.deleteOne.mockResolvedValue({ deletedCount: 1 })

        const result = await eventRepository.deleteEvent(existingEventId);

        expect(result).toBe(true);
        expect(mockEventModel.deleteOne).toHaveBeenCalledTimes(1);
        expect(mockEventModel.deleteOne).toHaveBeenCalledWith({ _id: existingEventId });

      })

      it('should return false if no event was deleted', async () => {
        mockEventModel.deleteOne.mockResolvedValue({ deletedCount: 0 })

        const result = await eventRepository.deleteEvent(nonExistingEventId);

        expect(result).toBe(false);
        expect(mockEventModel.deleteOne).toHaveBeenCalledTimes(1);
        expect(mockEventModel.deleteOne).toHaveBeenCalledWith({ _id: nonExistingEventId });
      })


    })

    describe('updateEvent', () => {
 
        const mockUpdateEventData: IUpdateEventData = {
            _id: '123456789',
            title: "New title",
        };

         const notFoundMockUpdateData: IUpdateEventData = {
            _id: 'Nothing_987654321',
            title: "No title",
        };

        const expectedUpdateFields = {
            title: 'New title'
        }

        const expectedNotFoundUpdateFields = {
            title: 'No title'
        };
    
      it('should return true if event edited', async () => {
        mockEventModel.updateOne.mockResolvedValue({ modifiedCount: 1, matchedCount: 1 })

        const result = await eventRepository.updateEvent(mockUpdateEventData);

        expect(result).toBe(true);
        expect(mockEventModel.updateOne).toHaveBeenCalledTimes(1);
        expect(mockEventModel.updateOne).toHaveBeenCalledWith({ _id: mockUpdateEventData._id }, { $set: expectedUpdateFields });

      })

      it('should return false if no event was edited', async () => {
        mockEventModel.updateOne.mockResolvedValue({ modifiedCount: 0 })

        const result = await eventRepository.updateEvent(notFoundMockUpdateData);

        expect(result).toBe(false);
        expect(mockEventModel.updateOne).toHaveBeenCalledTimes(1);
        expect(mockEventModel.updateOne).toHaveBeenCalledWith({ _id: notFoundMockUpdateData._id }, { $set: expectedNotFoundUpdateFields });
      })


    })
})


