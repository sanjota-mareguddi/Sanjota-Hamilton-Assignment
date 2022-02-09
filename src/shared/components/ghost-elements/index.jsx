import './style.scss';
const ListGhost = function () {
    const ghostList = [{}];
    return (
       
        <div className="ghost-lists">
            {ghostList.map((list,index) => (
                <div className="ghost-list" key={index}>
                    <div className="title ghost-elem shiny"></div>
                    <div className="title ghost-elem shiny"></div>
                    <div className="title ghost-elem shiny"></div>
                    <div className="title ghost-elem shiny"></div>
                </div>
            ))}
        </div>
    );
}

export default ListGhost;