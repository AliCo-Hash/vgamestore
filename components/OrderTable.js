import Image from "next/image";
import styles from "styles/order.module.css";

export default function OrderTable({ orderItems }) {
  return (
    <table className={styles.orderTable}>
      <thead className={styles.tableHead}>
        <tr className={styles.orderGame}>
          <th className={styles.orderItem}></th>
          <th className={styles.orderQuantity}></th>
          <th className={styles.orderPrice}></th>
          <th className={styles.orderAction}></th>
        </tr>
      </thead>
      <tbody>
        {orderItems.map(game => (
          <tr key={game.name} className={styles.tableBody}>
            <td>
              <div className={styles.orderGameName}>
                <Image
                  className={styles.image}
                  src={game.coverImage}
                  alt={game.name}
                  width={200}
                  height={100}
                  priority={true}
                />
                &nbsp;
                {game.name}
              </div>
            </td>
            <td className={styles.orderQuantity}>{game.quantity}</td>
            <td className={styles.orderPrice}>{game.price}</td>
            <td className={styles.orderCodes}>
              {game.orderedGameCodes.map(code => (
                <div key={code}>{code}</div>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
