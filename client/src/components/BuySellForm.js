import React, {useContext} from 'react';
import axios from 'axios';

const BuySellForm = () => {

    return(
        <div>
            <h3>Choose Crypto</h3>
            <h3>Funds</h3>
            <form>
                <input
                    type="text"
                    name="amountToSpend"
                    placeholder="USD Currency (min $100)"
                    // onChange={ (e) => setAmountToSpend(e.target.value)}
                    />
            </form>
        </div>
    )
}

export default BuySellForm;