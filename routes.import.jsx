import Layout from '/modules/layout/routes';

const { Router } = ReactRouter;
const history = ReactRouter.history.useQueries(ReactRouter.history.createHistory)();

const rootRoute = {
  childRoutes: [
    Layout
    //Accounts
  ]
};

Meteor.startup(() => {
  // todo remove blaze deps, then put router on root div
  ReactDOM.render(
    <Router history={ history } routes={ rootRoute }/>,
    document.body/*document.getElementById('root')*/);
});
