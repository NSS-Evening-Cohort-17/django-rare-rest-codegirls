export const UserCard = ({ user }) => {
  return (
    <div className="card">
      <div className="card-content">
        <picture>{/* <img src={'/images/dog.svg'} alt="My Dog" /> */}</picture>
        <h3>
          Name: <span className="card-username">{user}</span>
        </h3>
        {/* <p>Breed: {animal.breed}</p> */}
      </div>
    </div>
  );
};
