import React from 'react';

interface IProps {
  img: string;
  name: string;
  href: string;
  color: string;
  history: any;
}

const AuthButton = ({ img, name, href, color, history }: any) => {
  const NAME = name.charAt(0).toUpperCase() + name.substring(1, name.length);
  return (
    <div
      className='card'
      style={{ border: `1px solid ${color}`, borderRadius: 2 }}
      onClick={() => history.push(href)}
    >
      <div>
        <p
          style={{ margin: 0, textAlign: 'left', padding: '5px 0px 5px 10px' }}
        >
          {NAME}
        </p>
      </div>
      <div
        style={{
          minHeight: 100,
          minWidth: 100,
          background: `url("${img}") no-repeat center center / 50% ${color}`,
        }}
      />
    </div>
  );
};

export default AuthButton;
