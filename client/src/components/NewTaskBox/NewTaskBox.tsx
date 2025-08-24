import styles from './NewTaskBox.module.css'

function NewTaskBox() {

    return (
        <div className={ styles.newTaskBox }>
            <form className={ styles.newTaskForm }>

                <textarea className={ styles.newTaskTitle }></textarea>
                <textarea className={ styles.newTaskDescription }></textarea>
                <select id="newTaskDay" name="day">
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wdnesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturnday">Saturnday</option>
                    <option value="sunday">Sunday</option>
                </select>
                <button type="submit" className={ styles.newTaskButton }>Create</button>
            </form>

        </div>
    )
}

export default NewTaskBox;