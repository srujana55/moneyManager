import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,

    initialList: [],
    income: 0,
    expenses: 0,
  }

  onAddTransaction = event => {
    event.preventDefault()

    const {title, amount, type, income} = this.state

    const newHistory = {
      id: uuidv4(),
      title,
      amount,
      type,
    }
    console.log(type)
    let a = 0
    let b = 0
    if (type === 'INCOME') {
      a = parseInt(income) + parseInt(amount)
    } else {
      b = parseInt(amount)
    }

    this.setState(prevState => ({
      initialList: [...prevState.initialList, newHistory],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
      income: prevState.income + a,
      expenses: prevState.expenses + b,
    }))
  }

  onRemoveHistory = id => {
    let inn = 0
    let ex = 0
    const {initialList} = this.state
    const removedLi = initialList.filter(j => j.id === id)

    if (removedLi[0].type === 'INCOME') {
      inn = parseInt(removedLi[0].amount)
    } else {
      ex = parseInt(removedLi[0].amount)
    }
    const filteredList = initialList.filter(i => i.id !== id)
    this.setState(prevState => ({
      initialList: filteredList,
      income: prevState.income - inn,
      expenses: prevState.expenses - ex,
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amount: event.target.value})
  }

  onChangeType = event => {
    console.log(event.target.value)
    this.setState({type: event.target.value})
  }

  render() {
    const {title, amount, initialList, income, expenses, type} = this.state
    const balance = income - expenses
    console.log(initialList)
    return (
      <div className="bg-container">
        <div className="Name-card">
          <h1 className="heading">Hi, Richard</h1>
          <p className="para">
            Welcome back to your
            <span className="money-manager"> Money Manager</span>
          </p>
        </div>
        <div className="money-details-card">
          <div className="balance-card">
            <img
              className="balance-image"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
            />
            <div>
              <p className="para">Your Balance</p>
              <p data-testid="balanceAmount">Rs {balance}</p>
            </div>
          </div>
          <div className="balance-card  Income-card">
            <img
              className="balance-image"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
            />
            <div>
              <p className="para">Your Income</p>
              <p data-testid="incomeAmount">Rs {income}</p>
            </div>
          </div>
          <div className="balance-card expenses-card">
            <img
              className="balance-image"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
            />
            <div>
              <p className="para">Your Expenses</p>
              <p data-testid="expensesAmount">Rs {expenses}</p>
            </div>
          </div>
        </div>
        <div className="Bottom-container">
          <div className="add-transaction-card">
            <h1 className="add-trans">Add Transaction</h1>
            <form onSubmit={this.onAddTransaction}>
              <label className="labelText" htmlFor="html">
                TITLE
              </label>
              <br />
              <input
                value={title}
                onChange={this.onChangeTitle}
                placeholder="Salary"
                id="html"
                type="text"
              />
              <br />
              <br />
              <label htmlFor="amount" className="labelText">
                AMOUNT
              </label>
              <br />
              <input
                onChange={this.onChangeAmount}
                type="text"
                placeholder="AMOUNT"
                id="amount"
                value={amount}
              />
              <br />

              <br />
              <label htmlFor="type" className="labelText">
                TYPE
              </label>
              <br />
              <select
                value={type}
                onChange={this.onChangeType}
                name="Type"
                id="type"
              >
                <option
                  key={transactionTypeOptions[0].optionId}
                  value={transactionTypeOptions[0].optionId}
                >
                  {transactionTypeOptions[0].displayText}
                </option>
                <option
                  key={transactionTypeOptions[1].optionId}
                  value={transactionTypeOptions[1].optionId}
                >
                  {transactionTypeOptions[1].displayText}
                </option>
              </select>
              <br />
              <br />
              <button className="btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="history-Card">
            <h1 className="add-trans">History</h1>
            <ul className="list-con">
              <li className="list-item">
                <p>Title</p>
                <p>Amount</p>
                <p>Type</p>
              </li>
              {initialList.map(item => (
                <TransactionItem
                  onRemoveHistory={this.onRemoveHistory}
                  details={item}
                  key={item.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
