import React, {useEffect, useState} from 'react'

import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Modal,
  ScrollView
} from 'react-native'

import { ModalPicker } from '../../components/ModalPicker'

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'

import { Trash2, Plus } from 'lucide-react-native'

import api from '../../api'
import { OrderItem } from '../../components/OrderItem'

type RouteDetailParams = {
  Order: {
    table: number | string
    orderId: string
  }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>

export interface CategoryProps {
  id: string
  name: string
}

export interface ProductProps {
  id: string
  name: string
  price: string
  description: string
  banner: string
}

export interface OrderItemProps {
  id: string
  name: string
  amount: string | number
  productId: string
}

export default function Order() {
  const route = useRoute<OrderRouteProps>()
  const navigation = useNavigation()

  const [categories, setCategories] = useState<CategoryProps[] | []>([])
  const [products, setProducts] = useState<ProductProps[] | []>([])
  const [itens, setItens] = useState<OrderItemProps[] | []>([])

  const [modalCategoryVisible, setModalCategoryVisible] = useState<boolean>(false)
  const [modalProductVisible, setModalProductVisible] = useState<boolean>(false)

  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()
  const [productSelected, setProductSelected] = useState<ProductProps | undefined>() 
  const [amount, setAmount] = useState<string>('1')

  const handleCloseModalCategory = () => {
    setModalCategoryVisible(false)
  }

  const handleCloseModalProduct = () => {
    setModalProductVisible(false)
  }
  
  const handleDeleteOrder = async () => {
    try {
      await api.delete('/order/remove', {
        params: {
          orderId: route.params.orderId
        }
      })

      navigation.goBack()
    } catch (error) {
      
    }
  }

  const handleAddOrder = async () => {
    try {
      const response = await api.post('/orderItem', {
        orderId: route.params.orderId,
        productId: productSelected?.id,
        amount: Number(amount)
      })
      
      const data: OrderItemProps = {
        id: response.data.id,
        productId: productSelected?.id,
        name: productSelected?.name,
        amount: amount
      }
      
      setItens([...itens, data])
    } catch (error) {
      console.log(error)
    }
  }

  const getCategories = async () => {
    try {
      const response = await api.get('/category')    
      setCategories(response.data)
      setCategorySelected(response.data[0])
      
    } catch (error) {
      console.log(error);
    }
  }

  const getProductByCategory = async (categoryId: string) => {
    try {
      const response = await api.get('/category/products', {
        params: {
          categoryId
        }
      })
      setProducts(response.data)
      setProductSelected(response.data[0])
    } catch (error) {
      console.log(error);
            
    }
  }

  const handleDeleteItem = async (itemId: string, index: number) => {
    try {
      await api.delete('/orderItem/remove', {
        params: {
          orderItemId: itemId
        }
      })
      
      const refreshItens = itens.filter(item => item.id !== itemId)

      setItens(refreshItens)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setItens(itens)
  }, [itens])

  useEffect(() => {
    getCategories()    
  }, [])

  useEffect(() => {
    if(!categorySelected) {
      return
    }
    getProductByCategory(categorySelected?.id)
  }, [categorySelected])


  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerView}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Table {route.params.table}
          </Text>
          <TouchableOpacity 
            onPress={handleDeleteOrder} 
            disabled={itens.length === 0 ? false : true}
            style={{opacity: itens.length !== 0 ? 0.5 : 1}}
          >
            <Trash2 size={32} color='red'/>
          </TouchableOpacity>
        </View>

        <View style={styles.containerSelection}>
          {
            categories.length !== 0 && 
            <TouchableOpacity style={styles.selection} onPress={() => setModalCategoryVisible(true)}>
              <Text>{categorySelected?.name}</Text>
            </TouchableOpacity>
          }
          {
            products.length !== 0 && 
            <TouchableOpacity style={styles.selection} onPress={() => setModalProductVisible(true)}>
              <Text>{productSelected?.name}</Text>
            </TouchableOpacity>
          }
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.amount}>Amount</Text>
          <TextInput 
            value={amount} 
            onChangeText={(text) => setAmount(text)}
            keyboardType='numeric' 
            style={styles.amountInput}
          />
        </View>

        <View style={styles.containerBtn}>
          <TouchableOpacity 
            style={styles.plus} 
            onPress={handleAddOrder}
          >
            <Plus size={24} color='white' strokeWidth={3} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.next, { opacity: itens.length === 0 ? 0.5 : 1 }]}
            disabled={itens.length === 0 ? true : false}
          >
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>

        {
          itens.map((item, index) => (
            <OrderItem 
              key={index} 
              item={item} 
              deleteItem={() => handleDeleteItem(item.id, index)}
            />
          ))
        }

        {
          <Modal 
              transparent={true}
              visible = {modalCategoryVisible}
              animationType='fade'
            >
              <ModalPicker 
                options={categories} 
                close={handleCloseModalCategory} 
                itemSelected={setCategorySelected}
              />
          </Modal>
        }

        {
          <Modal
              transparent={true}
              visible = {modalProductVisible}
              animationType='slide'
            >
              <ModalPicker 
                options={products} 
                close={handleCloseModalProduct} 
                itemSelected={setProductSelected}
              />

          </Modal>
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  containerView: {
    paddingHorizontal: '10%',
    justifyContent: 'center',
    gap: 10,
    marginTop: '5%'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'white'
  },
  containerSelection: {
    gap: 8
  },
  selection:{
    backgroundColor: 'white',
    height: 40,
    paddingHorizontal: 8,
    justifyContent: 'center',
    borderRadius: 4
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  },
  amountInput: {
    backgroundColor: 'white',
    height: 40,
    textAlign: 'center',
    borderRadius: 4,
    width: '70%',
    color: 'black'
  },
  containerBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  plus: {
    height: 40,
    width: '20%',
    backgroundColor: '#3FD1FF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  next: {
    backgroundColor: '#42FF00',
    width: '77%',
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nextText: {
    fontWeight: 'bold',
    fontSize: 16
  }
})