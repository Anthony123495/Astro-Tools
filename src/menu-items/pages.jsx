// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Book1, I24Support, Security, MessageProgramming, DollarSquare, Airplane } from 'iconsax-react';

// type

// icons
const icons = {
  page: Book1,
  authentication: Security,
  maintenance: MessageProgramming,
  pricing: DollarSquare,
  contactus: I24Support,
  landing: Airplane
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  icon: icons.page,
  children: [
    {
      id: 'terms-of-service',
      title: <FormattedMessage id="Terms of Service" />,
      type: 'item',
      url: 'https://davidastro.com/policies/terms-of-service',
      icon: icons.page,
      target: true
    },
    {
      id: 'privacy-policy',
      title: <FormattedMessage id="Privacy Policy" />,
      type: 'item',
      url: 'https://davidastro.com/policies/privacy-policy',
      icon: icons.landing,
      target: true
    },
    {
      id: 'contact-us',
      title: <FormattedMessage id="Contact US" />,
      type: 'item',
      url: 'https://davidastro.com/pages/contact',
      icon: icons.contactus,
      target: true
    },
  ]
};

export default pages;
