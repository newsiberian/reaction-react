import {ComboBox, LoginBox, RegisterBox, ResetPasswordBox} from '{universe:accounts-ui}';

import Layout from 'layout';

/* login2 could be used as a demo of another conception */
FlowRouter.route('/login2', {
    name: 'login2',
    action () {
        ReactLayout.render(Layout, {
            content: <ComboBox resetLink={FlowRouter.path('resetPassword')}/>
        });
    }
});

FlowRouter.route('/login', {
    name: 'login',
    action () {
        ReactLayout.render(Layout, {
            content: <LoginBox registerLink={FlowRouter.path('register')}
                               resetLink={FlowRouter.path('resetPassword')}/>
        });
    }
});

FlowRouter.route('/register', {
    name: 'register',
    action () {
        ReactLayout.render(Layout, {
            content: <RegisterBox loginLink={FlowRouter.path('login')}/>
        });
    }
});

FlowRouter.route('/reset_password', {
    name: 'resetPassword',
    action () {
        ReactLayout.render(Layout, {
            content: <ResetPasswordBox loginLink={FlowRouter.path('login')}
                                       registerLink={FlowRouter.path('register')}/>
        });
    }
});

if (Meteor.isClient) {
    let lastLoggedInUserId = Meteor.userId();
    Tracker.autorun(() => {
        if (Meteor.userId() !== lastLoggedInUserId) {
            lastLoggedInUserId = Meteor.userId();

            // this will execute after login/logout/relogin without hot push side-effects

            FlowRouter.go('home');
        }
    });
}