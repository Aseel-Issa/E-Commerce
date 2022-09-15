
import { useEffect } from "react";

// node is the html element affected by a mouse click
// parent identifier that contains the node, and we don't want to execute the event on this node
// callback is the function to be invoked when clicked outside the node

const useOnClickOutside = (node, excludeInParentNode, callback)  => {

    let onClickEventHandler = (e) => {
        if(!node.current.contains(e.target) && (excludeInParentNode == null || !node.current.closest(excludeInParentNode))){
            callback()
        }
    }

    useEffect(()=>{
        if(node.current != null){
            document.addEventListener("mousedown", onClickEventHandler);

            return () => {
                document.removeEventListener("mousedown", onClickEventHandler);
              };
        
        }
        
    })
}

export default useOnClickOutside