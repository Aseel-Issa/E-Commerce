
export default function AppliedFilterButton({option, deselectOption}){
    return (
        <div className='applied-option-btn'>
            <span>{option.title}</span>
            <button onClick={()=> {deselectOption(option)}}>X</button>
        </div>
    )
}