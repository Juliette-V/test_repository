import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface IProps {
  children: ReactNode;
}

export const MainLayout = ({ children }: IProps) => {
  return (
    <div className="layout">
      <Sidebar />
      <div>
        <Header />
        <main className="main">{children}</main>
      </div>
    </div>
  );
};
