import { Switch, Radio, Menu, Form } from 'antd';
import classnames from 'classnames';

const RadioGroup = Radio.Group;
const MenuItemGroup = Menu.ItemGroup;
const FormItem = Form.Item;

const colors = [{
  title: 'blue',
  color: '#445b71',
}, {
  title: 'dark',
  color: '#404040',
}, {
  title: 'purple',
  color: '#3e2c42',
}, {
  title: 'white',
  color: '#ededed',
}];

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
  },
};

function Affix({
  layout,
  theme,
  onChange,
}) {
  const renderColors = () => {
    return (
      <div className="clearfix" style={{ marginTop: 5 }}>
        {colors.map(({ color, title }) => {
          const colorCls = classnames({
            'color-active': title == theme,
            color: true,
          });

          const colorProps = {
            key: color,
            title,
            className: colorCls,
            style: { background: color },
            onClick: () => onChange({ theme: title })
          };

          return <div {...colorProps} />;
        })}
      </div>
    );
  };

  return (
    <div className="hlayout-affix">
      <Menu
        style={{ width: 240 }}
        mode="inline"
      >
        <MenuItemGroup key="layout" title="LAYOUT OPTIONS">
          <Menu.Item key="1">
            <RadioGroup onChange={e => onChange({ layout: e.target.value })} defaultValue={layout}>
              <Radio value="primary">primary</Radio>
              <Radio value="normal">normal</Radio>
            </RadioGroup>
          </Menu.Item>
          <Menu.Item key="2">
            <FormItem
              {...formItemLayout}
              label="Boxed Layout"
            >
              <Switch onChange={checked => onChange({ isBoxed: checked })} />
            </FormItem>
          </Menu.Item>
          <Menu.Item key="3">
            <FormItem
              {...formItemLayout}
              label="Fixed sidebar"
            >
              <Switch onChange={checked => onChange({ isAsideFixed: checked })} />
            </FormItem>
          </Menu.Item>
        </MenuItemGroup>
        <MenuItemGroup key="nav" title="NAV COLOR">
          <Menu.Item key="4">
            {renderColors()}
          </Menu.Item>
        </MenuItemGroup>
      </Menu>
    </div>
  );
}

export default Affix;
