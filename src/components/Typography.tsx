import React from "react";

// Common props shared across typography components
interface BaseTypographyProps {
  children: React.ReactNode;
  className?: string;
}

// Label props with form-specific attributes
interface LabelProps extends BaseTypographyProps {
  htmlFor?: string;
  required?: boolean;
}

// Link props
interface LinkProps extends BaseTypographyProps {
  href: string;
  external?: boolean;
}

// Code block props
interface CodeProps extends BaseTypographyProps {
  inline?: boolean;
}

// Individual heading components
export const H1: React.FC<BaseTypographyProps> = ({
  children,
  className = "",
}) => (
  <h1
    className={`text-3xl md:text-4xl font-bold tracking-tight mb-6 ${className}`}
  >
    {children}
  </h1>
);

export const H2: React.FC<BaseTypographyProps> = ({
  children,
  className = "",
}) => (
  <h2
    className={`text-2xl md:text-3xl font-bold tracking-tight mb-4 ${className}`}
  >
    {children}
  </h2>
);

export const H3: React.FC<BaseTypographyProps> = ({
  children,
  className = "",
}) => (
  <h3
    className={`text-xl md:text-2xl font-bold tracking-tight mb-3 ${className}`}
  >
    {children}
  </h3>
);

export const H4: React.FC<BaseTypographyProps> = ({
  children,
  className = "",
}) => (
  <h4
    className={`text-lg md:text-xl font-bold tracking-tight mb-2 ${className}`}
  >
    {children}
  </h4>
);

// Individual text components
export const Paragraph: React.FC<BaseTypographyProps> = ({
  children,
  className = "",
}) => <p className={`my-4 text-gray-700 ${className}`}>{children}</p>;

export const SmallText: React.FC<BaseTypographyProps> = ({
  children,
  className = "",
}) => <span className={`text-sm text-gray-600 ${className}`}>{children}</span>;

export const MonoText: React.FC<BaseTypographyProps> = ({
  children,
  className = "",
}) => <span className={`font-mono text-sm ${className}`}>{children}</span>;

export const MutedText: React.FC<BaseTypographyProps> = ({
  children,
  className = "",
}) => <span className={`text-sm text-gray-500 ${className}`}>{children}</span>;

export const LeadText: React.FC<BaseTypographyProps> = ({
  children,
  className = "",
}) => <p className={`text-lg text-gray-600 ${className}`}>{children}</p>;

export const Label: React.FC<LabelProps> = ({
  children,
  className = "",
  htmlFor,
  required,
}) => (
  <label
    htmlFor={htmlFor}
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
  >
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  external,
  className = "",
}) => {
  const externalProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <a
      href={href}
      className={`text-blue-600 hover:text-blue-800 hover:underline ${className}`}
      {...externalProps}
    >
      {children}
      {external && <span className="inline-block ml-1 text-xs">↗</span>}
    </a>
  );
};

export const Code: React.FC<CodeProps> = ({
  children,
  inline = false,
  className = "",
}) => {
  if (inline) {
    return (
      <code
        className={`font-mono text-sm bg-gray-100 rounded px-1.5 py-0.5 ${className}`}
      >
        {children}
      </code>
    );
  }

  return (
    <pre
      className={`font-mono text-sm bg-gray-100 rounded-lg p-4 overflow-x-auto ${className}`}
    >
      <code>{children}</code>
    </pre>
  );
};

interface ListProps extends BaseTypographyProps {
  ordered?: boolean;
}

export const List: React.FC<ListProps> = ({
  ordered = false,
  children,
  className = "",
}) => {
  const Component = ordered ? "ol" : "ul";
  const baseStyles = ordered
    ? "list-decimal list-outside"
    : "list-disc list-outside";

  return (
    <Component className={`pl-6 mb-4 ${baseStyles} ${className}`}>
      {children}
    </Component>
  );
};

export const Blockquote: React.FC<BaseTypographyProps> = ({
  children,
  className = "",
}) => (
  <blockquote
    className={`pl-4 border-l-4 border-gray-300 text-gray-600 italic ${className}`}
  >
    {children}
  </blockquote>
);
