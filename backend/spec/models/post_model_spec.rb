require 'rails_helper'

RSpec.describe Post do
  describe ".published_in_the_future" do
    let!(:unpublished_post)     { create :post, title: 'unpublished post' }
    let!(:published_in_the_past)   { create :post, :published, :in_the_past, title: 'published in the past' }
    let!(:published_in_the_future) { create :post, :published, :in_the_future, title: 'published in the future' }


    it { expect(Post.published_in_the_future).to include published_in_the_future }
    it { expect(Post.published_in_the_future).not_to include unpublished_post }
    it { expect(Post.published_in_the_future).not_to include published_in_the_past }
  end
end