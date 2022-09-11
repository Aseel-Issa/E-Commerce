import logo from './logo.svg';
import './App.css';
import FiltersBar from './components/FiltersBar'
import filters from './data/filters'
import items from './data/items'
import { useState, useEffect, useRef } from 'react'
import AppliedFiltersSection from './components/AppliedFiltersSection';
import ItemsContainer from './components/ItemsContainer'

function App() {

  const [AllFilters, setAllFilters] = useState({})
  const [AllItems, setAllItems] = useState([])
  const initialRender = useRef(0)

  // assume will get this data from third party API
  // won't cause page freeze
  useEffect(() => {
    setAllItems(items)
    // console.log('initial items')
    // console.log(items)
  }, [])

  // assume will get this data from third party API
  // won't cause page freeze
  useEffect(() => {
    setAllFilters(filters)
  }, [])

  useEffect(() => {
    // check if we are in the first two renders, since react renders components twice in some cases
    if (initialRender.current < 2) {
      initialRender.current++
    } else {
      filterItems()
    }
  }, [AllFilters])

  // update the selected filters
  const applyChange = (filter, options) => {
    let tempFilters = { ...AllFilters }
    tempFilters[filter] = options
    setAllFilters(tempFilters)
  }

  // update results to be shown based on filters
  const filterItems = () => {
    let filteredItems = [...AllItems]
    // if there is no filter chosen then all items should be shown
    if (checkForNoFilter()) {
      // console.log('no filter yet')
      // console.log(filteredItems)
      filteredItems.forEach((item) => {
        item.chosen = true
      })

    }
    else {
      // Algorithm total time is O(n^m) where m is the filters and n is the items and m is fixed (number of filters options)
      // loop over each item (bigger loop O(n) )
      filteredItems.forEach(item => {
        let isChosen
        // loop over filters (smaller loop O(m) )
        for (let key in item.categories) {
          
          // console.log(key)
          // Don't check keys that are not filters
          // if (key === 'img' || key === 'chosen' || key === 'id')
          //   continue
          let filter = AllFilters[key]
          // If no options were selected froma filter then the item passes this filter
          if(filter.filter((option) => {return option.selected}).length === 0)
            continue
          // Between different filter types, all matches should be true, (ex: color is green, and room is living room)
          isChosen = false
          // one match is enough to consider this part as true (one option from the same filter type is enough (ex: color is green or white))
          filter.forEach(option => {
            if (option.selected) {
              // console.log(option.id+' '+item.categories[key])
              if (option.id === item.categories[key]) {
                isChosen = true
              }
            }
          })
          // if there is no match with at least one option from a chosen filter type, then don't show item
          if (!isChosen) {
            item.chosen = false
            break
          }
        }
        // if item matches the criteria of each selected filter type, then item is shown
        if (isChosen) {
          item.chosen = true
        }
      })
    }
    // console.log('filtered items:')
    // console.log(filteredItems)
    setAllItems(filteredItems)
  }

  // checks if there is no filter chosen yet
  const checkForNoFilter = () => {
    let noFilter = true
    for (let key in AllFilters) {
      AllFilters[key].forEach(option => {
        if (option.selected)
          noFilter = false
      })
    }
    return noFilter
  }

  // all filters should be selected false
  const clearFilters = () => {
    console.log('clearing')
    let tempFilters = { ...AllFilters }
    for (let key in tempFilters) {
      tempFilters[key].forEach(o => {
        o.selected = false
      })
    }
    // console.log(tempFilters)
    setAllFilters(tempFilters)
  }

  // deselect filter option
  const deselectOption = (option) => {
    let tempFilters = { ...AllFilters }
    for (let key in tempFilters) {
      let index = tempFilters[key].findIndex(o => {
        return o.id === option.id
      })
      if (index !== -1) {
        tempFilters[key][index].selected = false
        break
      }
    }
    setAllFilters(tempFilters)
  }

  return (
    <div className="App">
      <div className='logo'>
        <img src='/images/e-commerce-logo.jpeg'></img>
      </div>
      <FiltersBar AllFilters={AllFilters} applyChange={applyChange}></FiltersBar>
      <ItemsContainer AllItems={AllItems}></ItemsContainer>
      <AppliedFiltersSection AllFilters={AllFilters} deselectOption={deselectOption} clearFilters={clearFilters}></AppliedFiltersSection>
    </div>
  );
}

export default App;
