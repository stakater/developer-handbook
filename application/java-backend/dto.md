# ValueObject or DTO

A DTO or ValueObject should be designed like this:

```
package com.carbook.ratings.json.upsert;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;

import lombok.NonNull;
import lombok.Value;

@SuppressWarnings("unused")
@Value
@JsonDeserialize(builder = ApiCreateReviewItem.Builder.class)
public class ApiCreateReviewItem {
    private final String id;
    private final String type;
    private final Long rating;

    @JsonCreator
    @lombok.Builder(builderClassName = "Builder", builderMethodName = "newBuilder", toBuilder = true)
    private ApiCreateReviewItem(@NonNull String id, @NonNull String type, @NonNull Long rating) {
        this.id = id;
        this.type = type;
        this.rating = rating;
    }

    @JsonPOJOBuilder(withPrefix = "")
    public static class Builder {
    }
}
```

The lombok will generate a class like this:

```
//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by Fernflower decompiler)
//

package com.carbook.ratings.json.upsert;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import lombok.NonNull;

@JsonDeserialize(
    builder = ApiCreateReviewItem.Builder.class
)
public final class ApiCreateReviewItem {
    private final String id;
    private final String type;
    private final Long rating;

    @JsonCreator
    private ApiCreateReviewItem(@NonNull String id, @NonNull String type, @NonNull Long rating) {
        if (id == null) {
            throw new NullPointerException("id is marked @NonNull but is null");
        } else if (type == null) {
            throw new NullPointerException("type is marked @NonNull but is null");
        } else if (rating == null) {
            throw new NullPointerException("rating is marked @NonNull but is null");
        } else {
            this.id = id;
            this.type = type;
            this.rating = rating;
        }
    }

    public static ApiCreateReviewItem.Builder newBuilder() {
        return new ApiCreateReviewItem.Builder();
    }

    public ApiCreateReviewItem.Builder toBuilder() {
        return (new ApiCreateReviewItem.Builder()).id(this.id).type(this.type).rating(this.rating);
    }

    public String getId() {
        return this.id;
    }

    public String getType() {
        return this.type;
    }

    public Long getRating() {
        return this.rating;
    }

    public boolean equals(Object o) {
        if (o == this) {
            return true;
        } else if (!(o instanceof ApiCreateReviewItem)) {
            return false;
        } else {
            ApiCreateReviewItem other;
            label44: {
                other = (ApiCreateReviewItem)o;
                Object this$id = this.getId();
                Object other$id = other.getId();
                if (this$id == null) {
                    if (other$id == null) {
                        break label44;
                    }
                } else if (this$id.equals(other$id)) {
                    break label44;
                }

                return false;
            }

            Object this$type = this.getType();
            Object other$type = other.getType();
            if (this$type == null) {
                if (other$type != null) {
                    return false;
                }
            } else if (!this$type.equals(other$type)) {
                return false;
            }

            Object this$rating = this.getRating();
            Object other$rating = other.getRating();
            if (this$rating == null) {
                if (other$rating != null) {
                    return false;
                }
            } else if (!this$rating.equals(other$rating)) {
                return false;
            }

            return true;
        }
    }

    public int hashCode() {
        int PRIME = true;
        int result = 1;
        Object $id = this.getId();
        int result = result * 59 + ($id == null ? 43 : $id.hashCode());
        Object $type = this.getType();
        result = result * 59 + ($type == null ? 43 : $type.hashCode());
        Object $rating = this.getRating();
        result = result * 59 + ($rating == null ? 43 : $rating.hashCode());
        return result;
    }

    public String toString() {
        return "ApiCreateReviewItem(id=" + this.getId() + ", type=" + this.getType() + ", rating=" + this.getRating() + ")";
    }

    @JsonPOJOBuilder(
        withPrefix = ""
    )
    public static class Builder {
        private String id;
        private String type;
        private Long rating;

        Builder() {
        }

        public ApiCreateReviewItem.Builder id(String id) {
            this.id = id;
            return this;
        }

        public ApiCreateReviewItem.Builder type(String type) {
            this.type = type;
            return this;
        }

        public ApiCreateReviewItem.Builder rating(Long rating) {
            this.rating = rating;
            return this;
        }

        public ApiCreateReviewItem build() {
            return new ApiCreateReviewItem(this.id, this.type, this.rating);
        }

        public String toString() {
            return "ApiCreateReviewItem.Builder(id=" + this.id + ", type=" + this.type + ", rating=" + this.rating + ")";
        }
    }
}

```
