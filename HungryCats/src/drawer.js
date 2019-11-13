import React from 'react';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCart from "@bit/mui-org.material-ui-icons.shopping-cart";
import { ThemeProvider } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';



const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});

const useStyles = makeStyles({
  list: {
    width: 350,
  },
});

//https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

const complexGridStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

function ComplexGrid({product, productStates}) {
  const classes = complexGridStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            {console.log(product)}
            <ButtonBase className={classes.image}>
              {<img src={"data/products/"+product.sku+"_2.jpg"} height="100" width="100"></img>}
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {product.title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.size + " | " + product.style}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {"quantity: " + product.quantity}
                </Typography>
              </Grid>
              <Grid item>
                <Button onClick={ () => productStates.toggle(product, product.size, true) }>
                  Remove
                </Button>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {product.currencyFormat + " " + productStates.selected.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map()).get(product)*parseFloat(product.price, 10)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}


export function CartWindow({products, productStates, cartState, setCartState}) {
  const classes = useStyles();
  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setCartState({ ...cartState, [side]: open });
  };

  const sideList = (side,products, productStates, cartState) => (
    <div
      className={classes.list}
      role="presentation"
      //onClick={toggleDrawer(side, false)}
      //onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {productStates.selected.map(product =>
          <ComplexGrid key={product} product={product} productStates={productStates}/>
        )}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Button size="large" color="primary" onClick= {() =>{setCartState({ ...cartState, ['right']: true })}}><ShoppingCart /></Button>
      </ThemeProvider>
      <Drawer anchor="right" open={cartState.right} onClose={toggleDrawer('right', false)}>
        {sideList('right', products, productStates, cartState)}
      </Drawer>
    </div>
  );
}
