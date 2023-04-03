function Fashion() {
    return (
        <div className="home flex w-100 middle">
            <container className = "w-1200 flex col pad3 gap2">
                <h1 className="main-title font5">Fashion</h1>
                <div className="image-list flex gap2">
                    <div className="flex flex-2">
                        <img src="https://images.pexels.com/photos/949670/pexels-photo-949670.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                    </div>
                    <div className="flex col flex-1 gap2">
                        <div className="flex flex-1">
                            <img src="https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                        </div>
                        <div className="flex flex-1">
                            <img src="https://images.pexels.com/photos/1126935/pexels-photo-1126935.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                        </div>
                    </div>
                </div>
            </container>
        </div>
    );
}
export default Fashion;