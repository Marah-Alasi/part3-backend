export const Name = ({ person, handleDeletion }) => {
    return (
        <li key={person.id}>
            {person.name} -- {person.number}
            <button id={person.id} onClick={handleDeletion}>delete</button>
        </li>
    );
};
