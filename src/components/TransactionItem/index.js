import './index.css'

const TransactionItem = props => {
  const {transactionDetails, onDelete} = props
  const {id, title, amount, type} = transactionDetails

  const onClickDelete = () => {
    onDelete(id)
  }
  return (
    <li>
      <div className="transaction-details">
        <h3> {title}</h3>
        <h3> {amount} </h3>
        <h3> {type}</h3>
        <div>
          <button
            type="button"
            data-testId="delete"
            className="button1"
            onClick={onClickDelete}
          >
            {' '}
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
              alt="delete"
              className="image1"
            />
          </button>
        </div>
      </div>
    </li>
  )
}
export default TransactionItem
