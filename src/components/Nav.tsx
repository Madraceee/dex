import WalletStatus from "./WalletStatus";

export default function Nav () {
  return (
    <nav className="fixed w-full flex items-center py-4 px-8 bg-gray-950 text-white">
        <h1 className="text-xl font-bold mx-auto">Dex App</h1>
        <div className="justify-self-end"><WalletStatus /></div>
    </nav>
  );
}
