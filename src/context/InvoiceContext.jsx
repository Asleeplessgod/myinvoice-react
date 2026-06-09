import { createContext, useContext, useState, useEffect } from 'react'

const InvoiceContext = createContext()

function getUserKey() {
  const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}')
  return user.email ? `invoices_${user.email}` : 'invoices'
}

function loadInvoices() {
  const saved = JSON.parse(localStorage.getItem(getUserKey()) || '[]')
  const today = new Date().toISOString().split('T')[0]
  return saved.map(inv => {
    if (inv.status === 'unpaid' && inv.dueDate && inv.dueDate < today) {
      return { ...inv, status: 'overdue' }
    }
    return inv
  })
}

export function InvoiceProvider({ children }) {
  const [currency, setCurrencyState] = useState(() => {
    const settings = JSON.parse(localStorage.getItem('businessSettings') || '{}')
    return settings.currency || '₦'
  })

  const [invoices, setInvoices] = useState(loadInvoices)
  const [currentUser, setCurrentUser] = useState(
    () => localStorage.getItem('loggedInUser')
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const user = localStorage.getItem('loggedInUser')
      if (user !== currentUser) {
        setCurrentUser(user)
        setInvoices(loadInvoices())
      }
    }, 300)
    return () => clearInterval(interval)
  }, [currentUser])

  function addInvoice(invoice) {
    const updated = [...invoices, invoice]
    setInvoices(updated)
    localStorage.setItem(getUserKey(), JSON.stringify(updated))
  }

  function updateInvoice(id, updatedInvoice) {
    const updated = invoices.map(inv => inv.id === id ? updatedInvoice : inv)
    setInvoices(updated)
    localStorage.setItem(getUserKey(), JSON.stringify(updated))
  }

  function deleteInvoice(id) {
    const updated = invoices.filter(inv => inv.id !== id)
    setInvoices(updated)
    localStorage.setItem(getUserKey(), JSON.stringify(updated))
  }

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice, updateInvoice, deleteInvoice, currency }}>
      {children}
    </InvoiceContext.Provider>
  )
}

export function useInvoices() {
  return useContext(InvoiceContext)
}