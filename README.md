# E-Commerce

A front-end application that provides items, and users can narrow down the results by choosing multiple options of different kind of filters.

# Rule of filtration
the app has different type of filters such as (Size, Price, Style, Color, Room)
each filtration type has multiple options ex: Color has (Blue, Yellow, Green, ...etc)

Rules:
  1. if the user doesn't choose any filtration, then all Items should appear.
  2. if the user choose multiple options from the same filter type, then all items that match with at least one of these options appears in the items section.
  3. if the user choose options from different filtration types (size, room, ...etc) then at least one option should match per type. So all chosen types should match to true. ex: if user choose Room: kids, color: yellow, then app returns items that are for kids, and are yeloow at the same time, any other yellow items, should not return, neither any other room except for kids.
  
  as a conclustion, filtered items should pass the rule of (OR relationship for options of the same type) and (AND relationships between different filteration type).
  
  #Components
  
    1. FilterButton -> represents the filter
    2. FilterList -> represents the dropdown menu
    3. FilterOption -> represents the option included in the FilterList
    4. ItemsContainer - > represents the part where all the Items will be shown in.
    5. Item -> represents the item (image + price)
    6. AppliedFiltersSection -> contains all the chosen options, and a clear All button.
    7. AppliedFilterButton -> represents the option chosen by the user, it is different than FilterOption component because it has an extra remove button inside it.
    
   #Data
   
   There are two types of data:
   
      1. data/filters.js: conatins the filters defined in this app, so if there is a need to add one more filter, we can just add from the file without doing chnges on the code itself.
      2. data/items.js: contains the items to be shown in the app, each item has a categories object with contains the (key: is the same as the filter name in filters file, and value: has a value of the id of one options)
    
   #Component Tree
   ![component-tree](https://user-images.githubusercontent.com/33163148/189622900-39d25053-c37e-4235-a03f-b01ccf7011a3.jpg)

