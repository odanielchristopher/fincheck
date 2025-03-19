import { Logo } from '../../components/Logo';
import { UserMenu } from '../../components/UserMenu';
import { Accounts } from './components/Accounts';
import { DashboardProvider } from './components/DashboardContext';
import { Fab } from './components/Fab';
import { Transactions } from './components/Transaction';
import { NewBankAccountModal } from './modals/NewBankAccountModal';

export function Dashboard() {
  return (
    <DashboardProvider>
      <div className="w-full h-full p-4 lg:px-8 lg:pb-8 lg:pt-6 flex flex-col gap-4">
        <header className="h-12 flex items-center justify-between">
          <Logo className="h-6 text-teal-900" />

          <UserMenu />
        </header>

        <main className="flex-1 flex flex-col gap-4 lg:flex-row max-h-full">
          <div className="w-full lg:w-1/2">
            <Accounts />
          </div>

          <div className="w-full lg:w-1/2">
            <Transactions />
          </div>
        </main>

        <Fab />
        <NewBankAccountModal />
      </div>
    </DashboardProvider>
  );
}
