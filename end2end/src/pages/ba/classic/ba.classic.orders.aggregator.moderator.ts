import options from "options";

class BaAggregatorModeratorOrderList {
  path = "/fa_aggregator_valuation_order_list.html";

  private get $moderatorTable_wrapper() {
    return $(`#fa-aggregator-moderator-table_wrapper`);
  }
  private get $moderatorTable_processing() {
    return this.$moderatorTable_wrapper.$(`#fa-aggregator-moderator-table_processing`);
  }
  private get $moderatorTable_contenBase() {
    return this.$moderatorTable_wrapper.$(`#fa-aggregator-moderator-table`);
  }
  get $moderatorTable_firstElement() {
    return this.$moderatorTable_contenBase.$(`tbody tr`);
  }
  // ----------------------------------------------------------------------------------------
  private get $aggregatorOrdersTable_wrapper() {
    return $(`#fa-aggregator-valuation-orders-table_wrapper`);
  }
  private get $aggregatorOrdersTable_processing() {
    return this.$aggregatorOrdersTable_wrapper.$(
      `#fa-aggregator-valuation-orders-table_processing`
    );
  }
  private get $aggregatorOrdersTable_tableContent() {
    return this.$aggregatorOrdersTable_wrapper.$(`#fa-aggregator-valuation-orders-table`);
  }

  get $aggregatorOrdersTable_buttonAppraisingCompanyName() {
    return this.$aggregatorOrdersTable_tableContent.$(` tbody tr td a.btn`);
  }
  get $aggregatorOrdersTable_firstElement() {
    return this.$aggregatorOrdersTable_tableContent.$(`tbody tr td`);
  }
  get $$table_content() {
    return this.$aggregatorOrdersTable_tableContent.$$(`tbody tr`);
  }
  // --------------------------------------------------------------------------------------
  open() {
    browser.url(options.ba.host + this.path);
  }
  waitForLoad() {
    this.$aggregatorOrdersTable_tableContent.waitForExist({ timeout: 20000, reverse: false });
    this.$moderatorTable_contenBase.waitForExist({ timeout: 20000, reverse: false });

    this.$aggregatorOrdersTable_tableContent.scrollIntoView();
    this.$aggregatorOrdersTable_tableContent.waitForClickable();
    this.$moderatorTable_contenBase.scrollIntoView();
    this.$moderatorTable_contenBase.waitForClickable();
    // this.$aggregatorOrdersTable_processing.waitForDisplayed({timeout: 30000, reverse: false});
    // this.$aggregatorOrdersTable_processing.waitForDisplayed({timeout: 30000, reverse: true});
    this.$aggregatorOrdersTable_buttonAppraisingCompanyName.scrollIntoView();
    browser.waitUntil(
      () => this.$aggregatorOrdersTable_buttonAppraisingCompanyName.isDisplayedInViewport() === true
    );
    // this.$aggregatorOrdersTable_buttonAppraisingCompanyName.waitForClickable();
    this.$moderatorTable_firstElement.scrollIntoView();
    this.$moderatorTable_firstElement.waitForDisplayed({ timeout: 10000, reverse: false });
    this.$moderatorTable_firstElement.waitForEnabled({ timeout: 10000, reverse: false });
    browser.pause(1000);
  }
}

export const baAggregatorModeratorOrderList = new BaAggregatorModeratorOrderList();
