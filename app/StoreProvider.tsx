"use client"

import { makeStore ,AppStore } from "@/redux/store"
import {useRef} from "react"
import { Provider } from "react-redux"

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null)
    
    if (!storeRef.current) {
        storeRef.current = makeStore()
    }

    const store = storeRef.current

    return <Provider store={store}> {children} </Provider>
}