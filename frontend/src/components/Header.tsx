import {Wallet} from "lucide-react";
const Header = () => {
   return (
    <div className="border-b border-athens-gray">
        <header className="flex justify-between py-4 px-6 max-w-7xl m-auto">
            <div className=" flex items-center gap-3 ">
                <div className="w-9 h-9 bg-eastern-blue flex justify-center items-center">
                    <Wallet className= "h-4 w-4 text-white"/>
                </div>
            
           <h1 className="text-lg font-bold tracking-tight"> MarketSight</h1>
           </div>
        </header>
    </div>
   )
}

export default Header;