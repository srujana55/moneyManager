// Write your code here
import './index.css'

const TransactionItem = props => {
  const {details, onRemoveHistory} = props
  const {title, amount, type, id} = details
  let t = ''
  if (type === 'INCOME') {
    t = 'Income'
  } else {
    t = 'Expenses'
  }
  const onClickingDelete = () => {
    onRemoveHistory(id)
  }

  return (
    <li className="list-item">
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{t}</p>
      <button
        type="button"
        data-testid="delete"
        onClick={onClickingDelete}
        className="btn1"
      >
        <img
          className="delete-icon"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
