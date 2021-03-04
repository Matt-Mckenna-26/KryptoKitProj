/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  colors,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  },
  avatar: {
    backgroundColor: "transparent",
    color: "black",
    height: 56,
    width: 56
  },
  ranking: {
    width: 30
  },
  black: {
    color: "black",
    fontWeight: "bold"
  },
  green: {
    color: "green",
    //fontWeight: "bold"
  },
  red: {
    color: "red",
    //fontWeight: "bold"
  }
}));

const LatestOrders = ({ className, ...rest }) => {
  
  const [coins, setCoins] = useState([]);
  const pageRef = useRef(1);

  const getApi = async () => {
    const result = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${pageRef.current}&sparkline=true`);
    setCoins(result.data);
  }

  useEffect(() => {
    const interval = setInterval( () => getApi(), 1000 );
    return () => clearInterval(interval);
  },[pageRef])
 
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Cryptocurrency Prices by Market Cap" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  #
                </TableCell>
                <TableCell>
                  Image
                </TableCell>
                <TableCell>
                  Coin
                </TableCell>
                <TableCell>
                  Symbol
                </TableCell>
                <TableCell>
                  Price
                </TableCell>
                <TableCell>
                  24h
                </TableCell>
                <TableCell>
                  Mkt Cap
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map((coin, i) => (
                <TableRow
                  hover
                  key={coin.name}
                >
                  <TableCell className={classes.ranking}>
                      {coin.market_cap_rank}
                  </TableCell>
                  <TableCell>
                    <Avatar className={classes.avatar}>
                      <img src={coin.image} alt={coin.id} style={{width: "40px"}} />
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    {coin.id}
                  </TableCell>
                  <TableCell className={classes.black}>
                    {coin.symbol.toUpperCase()}
                    {/* {moment(order.createdAt).format('DD/MM/YYYY')} */}
                  </TableCell>
                  <TableCell>
                    ${coin.current_price.toLocaleString()}
                    {/* <Chip
                      color="primary"
                      label={coin.current_price.toLocaleString()}
                      size="small"
                    /> */}
                  </TableCell>
                  <TableCell>
                    <span className={coin.price_change_percentage_24h === null ? classes.black : coin.price_change_percentage_24h > 0 ? classes.green : classes.red}>{coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : 0}%</span>
                  </TableCell>
                  <TableCell>
                    ${coin.market_cap.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box 
        display="flex"
        justifyContent="space-between"
        minWidth={800}
        p={2}
      >
        <Button onClick={() => {pageRef.current === 1 ? pageRef.current = 1 : pageRef.current -= 1}}
          color="primary"
          startIcon={<ArrowLeftIcon />}
          size="small"
          variant="text"
        >
        Previous
        </Button>
        <Button onClick={() => pageRef.current += 1}
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Next
        </Button>
      </Box>
    </Card>
  );
};

LatestOrders.propTypes = {
  className: PropTypes.string
};

export default LatestOrders;