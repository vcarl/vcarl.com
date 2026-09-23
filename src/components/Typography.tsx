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

const ExternalIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block ml-1 w-[0.7em] h-[0.7em] align-baseline"
    aria-label="(external link)"
    role="img"
  >
    <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

// Octicons mark-github
const GitHubIcon = () => (
  <svg
    viewBox="0 0 16 16"
    fill="currentColor"
    className="inline-block w-[0.9em] h-[0.9em] align-[-0.1em]"
    aria-hidden="true"
  >
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
  </svg>
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
      {external && <ExternalIcon />}
    </a>
  );
};

interface ProjectProps {
  name: string;
  href?: string;
  code?: string;
  children?: React.ReactNode;
}

// Name links to the project if it has a home, else to the code.
// With both, a GitHub icon links to the code.
export const Project: React.FC<ProjectProps> = ({
  name,
  href,
  code,
  children,
}) => (
  <li>
    {href ? (
      <Link href={href} external={href.startsWith("http")}>
        {name}
      </Link>
    ) : (
      <Link href={code!}>{name}</Link>
    )}
    {href && code && (
      <a
        href={code}
        className="ml-1.5 text-gray-500 hover:text-gray-800"
        aria-label={`${name} source code`}
      >
        <GitHubIcon />
      </a>
    )}
    {children && <> — {children}</>}
  </li>
);

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
