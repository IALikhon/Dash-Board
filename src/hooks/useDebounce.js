import { useEffect, useState } from "react"

const useDebounce = ({value, deley=500}) => {
    const [debounced , setDebounced] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), deley)

        return ()=> clearTimeout(timer);
    },[value, deley])
  return debounced
}

export default useDebounce
