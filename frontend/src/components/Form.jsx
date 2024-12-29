export const Form = (props) => {
    return (
        <>
            <form onSubmit={props.onSubmit}>
                <div>
                    <div>name: <input value={props.newName} type='text' onChange={props.nameChange} /></div>
                    <div>number: <input value={props.newNumber} type='text' onChange={props.numberChange} /></div>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>
    );
};
