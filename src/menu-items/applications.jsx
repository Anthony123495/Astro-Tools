// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Add, Link1, KyberNetwork, Messages2, Calendar1, Kanban, Profile2User, Bill, UserSquare, ShoppingBag } from 'iconsax-react';

// type

// icons
const icons = {
  applications: KyberNetwork,
  chat: Messages2,
  calendar: Calendar1,
  kanban: Kanban,
  customer: Profile2User,
  invoice: Bill,
  profile: UserSquare,
  ecommerce: ShoppingBag,
  add: Add,
  link: Link1
};

// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const applications = {
  id: 'group-dashboard-loading',
  title: <FormattedMessage id="Tools" />,
  type: 'group',
  icon: icons.navigation,
  children: [
    {
      id: 'tool-list',
      title: <FormattedMessage id="All Tools"/>,
      type: 'item',
      icon: icons.navigation,
      url: '/apps/tools',
      link: '/apps/tools',
      breadcrumbs: false,
    },
  ],
  id: 'group-applications',
  title: <FormattedMessage id="applications" />,
  icon: icons.applications,
  type: 'group',
  children: [
    /*{
      id: 'all-tools',
      title: <FormattedMessage id="All Tools" />,
      url: '/apps/e-commerce/products',
      type: 'item',
      icon: icons.applications,
    }, */
    {
      id: 'gallery',
      title: <FormattedMessage id="Gallery (Coming Soon)"/>,
      type: 'item',
      icon: icons.kanban,
      url: '#',
      link: '#',
      breadcrumbs: false
    },
  ]
};

export default applications;
