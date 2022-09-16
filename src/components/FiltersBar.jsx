
import FilterButton from './FilterButton'
import Button from '@material-ui/core/Button'
import { useState} from 'react';

export default function FilterBar({ AllFilters, applyChange }) {

    const filterNames = Object.keys(AllFilters)

    const [isInsideMoreFilters, setInsideMoreFilters] = useState(false)


    // called when a user click on more filters button
    const handleMoreFilters = () => {
        setInsideMoreFilters(!isInsideMoreFilters)
    }

    return (
        <nav className='navbar'>
        <div id='bar'>
        <ul id='static-menu'>
                {filterNames.slice(0, 2).map(filter => {
                    return <li key={filter}><FilterButton  title={filter} options={AllFilters[filter]} applyChange={applyChange}></FilterButton></li>
                })}
        </ul>
        <a className='toggle-button'>
            <Button color="secondary" variant="outlined" onClick={handleMoreFilters}>More Filters</Button>
        </a>
        </div>
        <div className={isInsideMoreFilters? 'navbar-links active' : 'navbar-links'} id="myTopnav">
            <ul>

                {filterNames.slice(2).map(filter => {
                    return <li key={filter}><FilterButton title={filter} options={AllFilters[filter]} applyChange={applyChange}></FilterButton></li>
                })}
            </ul>
        </div>
        </nav>
    )
}