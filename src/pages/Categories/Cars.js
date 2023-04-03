function Cars() {
    return (
        <div className="home flex w-100 middle">
            <container className = "w-1200 flex col pad3 gap2">
                <h1 className="main-title font5">Cars</h1>
                <div className="image-list flex gap2">
                    <div className="flex flex-2">
                        <img src="https://images.pexels.com/photos/1035108/pexels-photo-1035108.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                    </div>
                    <div className="flex col flex-1 gap2">
                        <div className="flex flex-1">
                            <img src="https://images.pexels.com/photos/757185/pexels-photo-757185.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                        </div>
                        <div className="flex flex-1">
                            <img src="https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=800" className="cover"/>
                        </div>
                    </div>
                </div>
            </container>
        </div>
    );
}
export default Cars;
