// third-party
import { FormattedMessage } from 'react-intl';

// project-imports
import { useGetMenu } from 'api/menu';

// assets
import { Refresh, Home3, HomeTrendUp, Box1 } from 'iconsax-react';
import Breadcrumbs from 'components/@extended/Breadcrumbs';

const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  components: Box1,
  loading: Refresh
};

const loadingMenu = {
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
  ]
};

// ==============================|| MENU ITEMS - API ||============================== //

export function MenuFromAPI() {
  const { menu, menuLoading } = useGetMenu();

  if (menuLoading) return loadingMenu;

  const subChildrenList = (children) => {
    return children?.map((subList) => {
      return fillItem(subList);
    });
  };

  const itemList = (subList) => {
    let list = fillItem(subList);

    // if collapsible item, we need to feel its children as well
    if (subList.type === 'collapse') {
      list.children = subChildrenList(subList.children);
    }
    return list;
  };

  const childrenList = menu?.children?.map((subList) => {
    return itemList(subList);
  });

  let menuList = fillItem(menu, childrenList);
  return menuList;
}

function fillItem(item, children) {
  return {
    ...item,
    title: <FormattedMessage id={`${item?.title}`} />,
    // @ts-ignore
    icon: icons[item?.icon],
    ...(children && { children })
  };
}
