interface MyComponentProps {
    name: string;
    age?: number; // Optional prop
    onClick: () => void;
  }

const MyComponent: React.FC<MyComponentProps> = ({ name, age, onClick }) => {
    return (
      <div>
        <p>Name: {name}</p>
        {age && <p>Age: {age}</p>}
        <button onClick={onClick}>Click me</button>
      </div>
    );
  };

  export default MyComponent