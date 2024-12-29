export const Filter = (props) => {
    return (
        <>
            <h3>search by name</h3>
            <div>
                <div>search for: <input value={props.value} type='text' onChange={props.function} /></div>
            </div>
        </>
    );
};
