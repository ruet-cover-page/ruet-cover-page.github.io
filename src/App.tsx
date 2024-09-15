import { useState } from 'react';
import './App.css';
import { Button } from './components/ui/button';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <main className="fixed inset-0 flex justify-center items-center">
      <Button onClick={() => setCount((x) => x + 1)}>Click me {count}</Button>
    </main>
  );
};

export default App;
