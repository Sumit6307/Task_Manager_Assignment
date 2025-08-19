import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <div className="flex">
            <Sidebar />
            <main className="flex-1 p-4">
              <AppRoutes />
            </main>
          </div>
        </div>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;