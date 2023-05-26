import WalletStatus from "./WalletStatus";

export default function Nav () {
  return (
    <nav className="fixed w-full flex items-center justify-between py-4 px-8 bg-gray-950 text-white text-center">
        <h1 className="font-bold text-2xl">Dex App</h1>
        <div ><WalletStatus /></div>
    </nav>
  );
}
