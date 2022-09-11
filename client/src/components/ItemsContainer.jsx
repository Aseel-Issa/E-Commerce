
import Item from './Item'
export default function ItemsContainer({AllItems}) {

    // only show items that has chosen attribute set to true
    let itemsToShow = AllItems.filter(item => {return item.chosen})
    
    return (
        <div className='items-container'>
            {itemsToShow.map(item => {
                return <Item key={item.id} item={item}></Item>
            })}
        </div>
    )
}