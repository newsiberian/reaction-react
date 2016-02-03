/**
 * @classdesc ReactionApps
 */
import { AutorunMixin, SubscriptionMixin } from '{universe:utilities-react}';
import { reactionApps } from './packages';

let ReactionApps = React.createClass({
  displayName: 'ReactionApps',
  propTypes: {
    children: React.PropTypes.node
  },
  mixins: [SubscriptionMixin, AutorunMixin],

  autorun() {
    reactionApps();
  },

  render() {
    return <this.props.children />;
  }
});
