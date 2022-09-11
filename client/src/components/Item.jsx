

export default function Item ({item}){

    // show image and price of the item
    return(
        <div className='item'>
            <img src={item.img}></img>
            <p>{item.price}$</p>
        </div>
    )
}