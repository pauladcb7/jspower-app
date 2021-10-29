import React from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { useSelector, useStore, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
const TheHeaderDropdownSettings = () => {
  const user = useSelector((state) => {
    return state.user;
  });
  const history = useHistory();
  const itemsCount = 4;
  return (
    <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-settings" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light">
          <strong>Settings</strong>
        </CDropdownItem>

        <CDropdownItem onClick={(item) => history.push(`/install-ios`)}>
          <CIcon name="cil-mobile" className="mfe-2" />
          Install App on IOs
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdownSettings;
