import {useTranslation} from "react-i18next";
import settingsHomeCard from "../../../../assets/img/settingsHomeCard.png";
import {useCurrentUser} from "../../../../contexts/UserContext";
import servicesHomeCard from "../../../../assets/img/servicesHomeCard.png";
import homeScreeBike from "../../../../assets/img/homeScreeBike.svg";
import clientsHomeCard from "../../../../assets/img/customersHomeCard.png";
import employeesHomeCard from "../../../../assets/img/employeesHomeCard.png";
import {Roles} from "../../../../enums/Roles";
import useRole from "../../../../hooks/useRole";

export interface LinkButton {
  title: string;
  route: string;
  visible?: boolean;
}

interface UseHomepageCards {
  primaryButton: LinkButton;
  secondaryButton?: LinkButton;
  visible?: boolean;
  header: string;
  image: string;
}

export const useHomepageCards = (): UseHomepageCards[] => {
  const { t } = useTranslation();
  const { currentUser } = useCurrentUser();
  const hasRole = useRole();

  return [
    {
      image: settingsHomeCard,
      primaryButton: { title: t('homePage.more'), route: `/user/${currentUser?.userId}/settings` },
      header: t('homePage.settings'),
    },
    {
      image: homeScreeBike,
      primaryButton: { title: t('homePage.check'), route: `/customers/${currentUser?.userId}/bikes` },
      secondaryButton: { title: t('homePage.add'), route: '/orders/new' },
      header: t('homePage.myBikes'),
      visible: hasRole(Roles.Customer),
    },
    {
      image: clientsHomeCard,
      primaryButton: { title: t('homePage.goTo'), route: '/customers' },
      secondaryButton: { title: t('homePage.add'), route: '/customers/new' },
      header: t('homePage.customers'),
      visible: hasRole(Roles.Employee, Roles.Owner),
    },
    {
      image: servicesHomeCard,
      primaryButton: { title: t(hasRole(Roles.Customer) ? 'homePage.check' : 'homePage.goTo'), route: '/orders' },
      secondaryButton: { title: t('homePage.add'), route: '/orders/new', visible: hasRole(Roles.Employee, Roles.Owner) },
      header: t('homePage.servicePanel'),
    },
    {
      image: employeesHomeCard,
      primaryButton: { title: t('homePage.goTo'), route: '/employees' },
      secondaryButton: { title: t('homePage.add'), route: '/employees/new' },
      header: t('homePage.employees'),
      visible: hasRole(Roles.Owner),
    },
  ];
};
