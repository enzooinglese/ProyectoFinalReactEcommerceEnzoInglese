import { useEffect, useState } from "react"
import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from "react-router-dom"
import { getProductById } from "../../services/firebase/products"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const [loading,setLoading] = useState(true)
    const {itemId} = useParams()

    useEffect (() => {
        setLoading(true)
        getProductById(itemId)
            .then(response => {
                setProduct(response)
            })
            .catch(error=>{
                console.log(error)
            })
            .finally(()=>{
                setLoading(false)
            })
        },[itemId] )

        if(loading) {
            return <h1>Cargando Producto</h1>
        }

        if(!product) {
            return <h1>El producto no existe</h1>
        }

        return(
            <div>
            <ItemDetail {...product} />
            </div>
        )
}

export default ItemDetailContainer