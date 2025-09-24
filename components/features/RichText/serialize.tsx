import escapeHTML from 'escape-html';
import React, { Fragment } from 'react';
import { Text } from 'slate';

type Children = Leaf[];

type Leaf = {
  [key: string]: unknown;
  children: Children;
  type: string;
  url?: string;
  value?: {
    alt: string;
    url: string;
  };
};

const serialize = (children: Children): React.ReactNode[] =>
  children.map((node, i) => {
    if (Text.isText(node)) {
      let text = <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />;

      if (node.bold) {
        text = (
          <strong key={i} className="font-semibold text-gray-900">
            {text}
          </strong>
        );
      }

      if (node.code) {
        text = (
          <code
            key={i}
            className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800"
          >
            {text}
          </code>
        );
      }

      if (node.italic) {
        text = (
          <em key={i} className="italic">
            {text}
          </em>
        );
      }

      if (node.underline) {
        text = (
          <span key={i} className="underline">
            {text}
          </span>
        );
      }

      if (node.strikethrough) {
        text = (
          <span key={i} className="line-through text-gray-500">
            {text}
          </span>
        );
      }

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case 'blockquote':
        return (
          <blockquote key={i} className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700">
            {serialize(node.children)}
          </blockquote>
        );
      case 'h1':
        return (
          <h1 key={i} className="text-4xl font-bold tracking-tight mb-4 text-gray-900">
            {serialize(node.children)}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={i} className="text-3xl font-bold tracking-tight mb-3 text-gray-900">
            {serialize(node.children)}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={i} className="text-2xl font-bold tracking-tight mb-2 text-gray-900">
            {serialize(node.children)}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={i} className="text-xl font-bold tracking-tight mb-2 text-gray-800">
            {serialize(node.children)}
          </h4>
        );
      case 'h5':
        return (
          <h5 key={i} className="text-lg font-bold tracking-tight mb-1 text-gray-800">
            {serialize(node.children)}
          </h5>
        );
      case 'h6':
        return (
          <h6 key={i} className="text-base font-bold tracking-tight mb-1 text-gray-800">
            {serialize(node.children)}
          </h6>
        );
      case 'li':
        return (
          <li key={i} className="mb-1 text-gray-700">
            {serialize(node.children)}
          </li>
        );
      case 'link':
        return (
          <a
            href={escapeHTML(node.url)}
            key={i}
            className="text-blue-600 underline hover:text-blue-800 transition-colors"
          >
            {serialize(node.children)}
          </a>
        );
      case 'ol':
        return (
          <ol key={i} className="list-decimal pl-6 mb-4 space-y-1">
            {serialize(node.children)}
          </ol>
        );
      case 'ul':
        return (
          <ul key={i} className="list-disc pl-6 mb-4 space-y-1">
            {serialize(node.children)}
          </ul>
        );

      default:
        return (
          <p key={i} className="text-base leading-7 mb-4 text-gray-700">
            {serialize(node.children)}
          </p>
        );
    }
  });

export default serialize;
