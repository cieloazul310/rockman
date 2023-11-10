import * as path from 'path';
import type { StorybookConfig } from '@storybook/core-common';
import type { RuleSetRule, RuleSetUseItem } from 'webpack';

function isRuleSetRule(
  rule: false | "" | 0 | "..." | RuleSetRule | null | undefined,
): rule is RuleSetRule {
  if (!rule) return false;
  return typeof rule === "object";
}

function isRuleSetUseItemArray(use: any): use is RuleSetUseItem[] {
  if (!use) return false;
  if (typeof use !== 'object') return false;
  return true;
}

function isRuleSetUseItemObject(ruleSetUseItem: RuleSetUseItem): ruleSetUseItem is {
  ident?: string;
  loader?: string;
  options?: string | { [index: string]: any };
} {
  return typeof ruleSetUseItem === 'object';
}

const toPath = (filePath: string) => path.join(process.cwd(), filePath);

const config: StorybookConfig = {
  stories: ['../src/stories/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  features: {
    storyStoreV7: true,
    emotionAlias: false,
  },
  typescript: {
    check: false,
    checkOptions: {},
    // @ts-expect-error
    reactDocgen: 'react-docgen-typescript-plugin',
    reactDocgenTypescriptOptions: {
      // @ts-ignore
      allowSyntheticDefaultImports: false, // speeds up storybook build time
      esModuleInterop: false, // speeds up storybook build time
      shouldExtractLiteralValuesFromEnum: true, // makes union prop types like variant and size appear as select controls
      shouldRemoveUndefinedFromOptional: true, // makes string and boolean types that can be undefined appear as inputs and switches
      propFilter: (prop: any) => (prop.parent ? !/node_modules\/(?!@mui)/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (baseConfig) => {
    const rule = baseConfig.module?.rules?.[0];
    if (isRuleSetRule(rule)) {
      // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
      rule.exclude = [/node_modules\/(?!(gatsby|gatsby-script)\/)/];

      // Remove core-js to prevent issues with Storybook
      rule.exclude = [/core-js/];
      // Use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      if (isRuleSetUseItemArray(rule.use) && isRuleSetUseItemObject(rule.use[0])) {
        const { options } = rule.use[0];
        if (typeof options === 'object') {
          options.plugins.push(require.resolve('babel-plugin-remove-graphql-queries'));
        }
      }
    }

    return {
      ...(baseConfig || {}),
      resolve: {
        ...(baseConfig.resolve || {}),
        mainFields: ['browser', 'module', 'main'],
        alias: {
          ...(baseConfig.resolve?.alias || {}),
          '@emotion/core': toPath('./node_modules/@emotion/react'),
          'emotion-theming': toPath('./node_modules/@emotion/react'),
          '@reach/router': toPath('./node_modules/@gatsbyjs/reach-router'),
        },
      },
    };
  },
};

export default config;
