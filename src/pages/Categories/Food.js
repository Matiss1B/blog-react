function Food() {
    return (
        <div className="home flex w-100 middle">
            <container className = "w-1200 flex col pad3 gap2">
                <h1 className="main-title font5">Food</h1>
                <div className="image-list flex gap2 wrap">
                    <div className="flex flex-2">
                        <img src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                    </div>
                    <div className="flex col flex-1 gap2">
                        <div className="flex flex-1">
                            <img src="https://images.pexels.com/photos/3535383/pexels-photo-3535383.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                        </div>
                        <div className="flex flex-1">
                            <img src="https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                        </div>
                    </div>
                </div>
            </container>
        </div>
    );
}
export default Food;